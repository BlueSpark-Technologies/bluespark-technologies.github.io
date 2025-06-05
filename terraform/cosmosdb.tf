module "cosmon-bst" {
  source              = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-cosmon?ref=main"
  environment         = var.environment
  project             = "bst"
  region              = var.region
  purpose             = "app"
  resource_group_name = module.rg-bst.resource_group_name

  geo_location = [{
    failover_priority = 0
    location          = "germanywestcentral"
    zone_redundant    = false
  }]

  capabilities = [{
    name = "EnableMongo"
  }]

  backup = [{
    tier = "Continuous7Days"
    type = "Continuous"
  }]

  consistency_policy = [{
    consistency_level = "Session"
  }]

  mongo_database = [{
    name       = "bst"
    throughput = 1000
  }]

  tags = var.tags
}

module "cosmon-private-endpoint-bst" {
  source              = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-pep?ref=0.0.12"
  environment         = var.environment
  project             = "bst"
  region              = var.region
  purpose             = "app"
  resource_group_name = module.rg-bst.resource_group_name
  subnet_id           = module.network-bst.subnets["snet-${terraform.workspace}-bst-gwc-private-1"].id

  private_service_connection = [{
    name                           = "cosmon-private-endpoint-bst"
    private_connection_resource_id = module.cosmon-bst.cosmosdb_account_id
    subresource_names              = ["MongoDB"]
    is_manual_connection           = false
  }]

  private_dns_zone_group = [{
    name                 = "cosmon-private-dns-zone-bst"
    private_dns_zone_ids = [module.cosmon-private-dns-zone-bst.dns_zone_id]
  }]

  tags = var.tags
}

module "cosmon-private-dns-zone-bst" {
  source          = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-pdns?ref=0.0.12"
  environment     = var.environment
  project         = "bst"
  region          = var.region
  purpose         = "app"
  create_dns_zone = true
  public_dns_zone = false
  pdns_zone_name  = "privatelink.mongo.cosmos.azure.com"
  rg_name         = module.rg-bst.resource_group_name
  vnet_id         = module.network-bst.vnet_id

  tags = var.tags
}
