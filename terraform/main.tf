module "rg-bst" {
  source      = "git@github.com:BlueSpark-Technologies/Azure.git//modules/tf-module-az-rg?ref=0.0.17"
  environment = var.environment
  project     = "bst"
  region      = var.region
  purpose     = "app"

  tags = var.tags
}