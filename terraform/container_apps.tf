module "cae-bst" {
  source                   = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-cae?ref=0.0.10"
  environment              = var.environment
  project                  = "bst"
  region                   = var.region
  purpose                  = "app"
  resource_group_name      = module.rg-bst.resource_group_name
  infrastructure_subnet_id = module.network-bst.subnets["snet-${terraform.workspace}-bst-gwc-ca-private-1"].id

  tags = var.tags
}

module "ca-bst-ui" {
  source                       = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-ca?ref=0.0.10"
  environment                  = var.environment
  project                      = "bst-ui"
  region                       = var.region
  purpose                      = "app"
  container_app_environment_id = module.cae-bst.container_apps_environment_id
  resource_group_name          = module.rg-bst.resource_group_name

  revision_mode = "Single"
  ingress = [{
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 3000
    transport                  = "auto"
    traffic_weight = [{
      latest_revision = true
      percentage      = 100
    }]
  }]
  template = [{
    max_replicas = 1
    min_replicas = 1
    container = [{
      cpu    = 0.25
      image  = "ghcr.io/bluespark-technologies/bst-ui:latest"
      memory = "0.5Gi"
      name   = "bst-ui"
      env = [
        {
          name        = "MONGODB_URI"
          secret_name = "mongodb-uri"
        },
        {
          name        = "AZURE_CLIENT_ID"
          secret_name = "azure-client-id"
        },
        {
          name        = "AZURE_TENANT_ID"
          secret_name = "azure-tenant-id"
        },
        {
          name        = "AZURE_CLIENT_SECRET"
          secret_name = "azure-client-secret"
        },
        {
          name        = "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
          secret_name = "next-public-recaptcha-site-key"
        },
        {
          name        = "RECAPTCHA_SECRET_KEY"
          secret_name = "recaptcha-secret-key"
        },
        {
          name        = "EMAIL_SENDER_ADDRESSs"
          secret_name = "email-sender-address"
        },
      ]
    }]
  }]

  secret = [
    {
      name                = "ghcrio-devopsbst"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/ghcrio-devopsbst"
    },
    {
      name                = "azure-client-id"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/azure-client-id"
    },
    {
      name                = "azure-client-secret"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/azure-client-secret"
    },
    {
      name                = "azure-tenant-id"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/azure-tenant-id"
    },
    {
      name                = "email-sender-address"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/email-sender-address"
    },
    {
      name                = "mongodb-uri"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/mongodb-uri"
    },
    {
      name                = "next-public-recaptcha-site-key"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/next-public-recaptcha-site-key"
    },
    {
      name                = "recaptcha-secret-key"
      identity            = module.id-ca-permission-bst.user_assigned_identity_id
      key_vault_secret_id = "${module.kv-bst.key_vault_uri}secrets/recaptcha-secret-key"
    },
  ]

  registry = [{
    server               = "ghcr.io"
    password_secret_name = "ghcrio-devopsbst"
    username             = "devopsbst"
  }]

  identity = [{
    type         = "UserAssigned"
    identity_ids = [module.id-ca-permission-bst.user_assigned_identity_id]
  }]

  tags = var.tags
}