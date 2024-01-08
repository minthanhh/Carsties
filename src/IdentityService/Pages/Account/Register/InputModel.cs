// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.

using System.ComponentModel.DataAnnotations;

namespace IdentityService.Pages.Register;

public class InputModel
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string FullName { get; set; }
    public string ReturnUrl { get; set; }
    public string Button { get; set; }
}