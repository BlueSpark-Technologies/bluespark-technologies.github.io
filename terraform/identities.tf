module "ra-ca-permission-bst" {
  source               = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-ra?ref=0.0.3"
  scope                = module.rg-bst.resource_group_id
  role_definition_name = var.role_definition_name # separate module for this
  principal_id         = module.id-ca-permission-bst.user_assigned_identity_principal_id
}

module "id-ca-permission-bst" {
  source              = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-id?ref=0.0.4"
  environment         = var.environment
  project             = "bst"
  region              = var.region
  purpose             = "ca-permission"
  resource_group_name = module.rg-bst.resource_group_name

  tags = var.tags
}