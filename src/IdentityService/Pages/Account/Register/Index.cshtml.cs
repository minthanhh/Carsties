using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace IdentityService.Pages.Register;

[SecurityHeaders]
[AllowAnonymous]
public class Index(UserManager<ApplicationUser> userManager) : PageModel
{
    [BindProperty]
    public InputModel Input { get; set; }
    [BindProperty]
    public bool RegisterSuccess { get; set; }
    public IActionResult OnGet(string returnUrl)
    {
        Input = new InputModel
        {
            ReturnUrl = returnUrl
        };
        return Page();
    }

    public async Task<IActionResult> OnPost()
    {
        if (Input.Button != "register") return Redirect("~/");

        if (ModelState.IsValid)
        {
            Console.WriteLine(Input);

            var user = new ApplicationUser
            {
                UserName = Input.Username,
                Email = Input.Email,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, Input.Password);

            if (result.Succeeded)
            {
                await userManager.AddClaimsAsync(user, [new(JwtClaimTypes.Name, Input.FullName)]);
                RegisterSuccess = true;
            }
        }

        return Page();
    }

}