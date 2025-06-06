variable "environment" {
  description = "Application environment that will be reflected in resource name (e.g dev, demo, staging, prod)"
  type        = string
  nullable    = false
}

variable "region" {
  description = "Region where the resource will be created (e.g useast, westeurope)."
  type        = string
  nullable    = false
}

variable "role_definition_name" {
  description = "(Optional) The name of a built-in Role. Changing this forces a new resource to be created. Conflicts with role_definition_id."
  type        = string
  nullable    = false
}

variable "vnet_address_space" {
  description = "Address space for the VNet"
  type        = string
  default     = null
}

variable "azurerm_subnet" {
  type = list(object({
    name                            = string
    address_prefixes                = list(string)
    default_outbound_access_enabled = optional(bool)
  }))
  description = <<-EOT
  * name - (Required) The name of the subnet. Changing this forces a new resource to be created.
  * address_prefixes - (Required) The address prefixes to use for the subnet.
  * default_outbound_access_enabled - (Optional) Enable default outbound access to the internet for the subnet. Defaults to true.
  EOT
  default     = null
}

variable "tags" {
  description = "(Optional) A mapping of tags to assign to the resource."
  type        = map(string)
  nullable    = false
}