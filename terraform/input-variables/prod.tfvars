environment          = "prod"
region               = "germanywestcentral"
vnet_address_space   = "10.3.0.0/20"
role_definition_name = "role-prod-bst-app"

azurerm_subnet = [
  {
    name                            = "snet-prod-bst-gwc-ca-private-1"
    address_prefixes                = ["10.3.0.0/23"]
    default_outbound_access_enabled = false
  },
  {
    name             = "snet-prod-bst-gwc-public-1"
    address_prefixes = ["10.3.2.0/26"]
  },
  {
    name                            = "snet-prod-bst-gwc-private-1"
    address_prefixes                = ["10.3.3.0/24"]
    default_outbound_access_enabled = false
  }
]

tags = {
  Project     = "BST"
  Environment = "prod"
}