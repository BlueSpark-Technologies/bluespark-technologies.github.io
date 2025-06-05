module "kv-bst" {
  source                     = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-kv?ref=0.0.9"
  environment                = var.environment
  project                    = "bst"
  region                     = var.region
  purpose                    = "vars"
  resource_group_name        = module.rg-bst.resource_group_name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days = 7

  tags = var.tags
}