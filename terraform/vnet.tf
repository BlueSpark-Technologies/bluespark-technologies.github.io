module "network-bst" {
  source              = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-vnet?ref=0.0.20"
  environment         = var.environment
  project             = "bst"
  region              = var.region
  purpose             = "net"
  resource_group_name = module.rg-bst.resource_group_name
  vnet_address_space  = var.vnet_address_space
  azurerm_subnet      = var.azurerm_subnet

  tags = var.tags
}