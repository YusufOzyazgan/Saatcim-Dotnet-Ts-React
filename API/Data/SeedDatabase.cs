using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class SeedDatabase
{
    public static async void Initilaze(IApplicationBuilder app)
    {
        var userManager = app.ApplicationServices.CreateScope()
        .ServiceProvider
        .GetRequiredService<UserManager<AppUser>>();

        var roleManager = app.ApplicationServices.CreateScope()
        .ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

        if (!roleManager.Roles.Any())
        {
            var customer = new AppRole { Name = "Custumer" };
            var admin = new AppRole { Name = "Admin" };
            await roleManager.CreateAsync(customer);
            await roleManager.CreateAsync(admin);
        }

        if (!userManager.Users.Any())
        {
            var users = new List<AppUser> { 
                new() { UserName ="Admin" , Email=  "admin@gmail.com" , FullName = "Admin" },
                new() { UserName ="Yucufer" , Email=  "yucufer@gmail.com" , FullName = "Yusuf Özyazgan" },
                new() { UserName ="SemraKaragoz" , Email=  "semra@gmail.com" , FullName = "Semra Karagöz" },
                new() { UserName ="EmreKul" , Email=  "emreKul@gmail.com" , FullName = "Emre Kul" },
                new() { UserName ="ArifDondurmaci" , Email=  "arif@gmail.com" , FullName = "Arif Dondurmacı" },
                new() { UserName ="HuseyinOksuz" , Email=  "huseyin@gmail.com" , FullName = "Hüseyin Öksüz" }
                };
            foreach(var user in users){
                await userManager.CreateAsync(user,"Abc.123");
                if (user.UserName == "Admin" || user.UserName == "Yucufer"){
                    await userManager.AddToRolesAsync(user,["Admin","Customer"]);
                }
                else{
                    await userManager.AddToRoleAsync(user,"Customer");
                }

            }
        }
        if (userManager.Users.Count() == 4){
            var newUsers = new List<AppUser> {
                new() { UserName ="ArifDondurmaci" , Email=  "arif@gmail.com" , FullName = "Arif Dondurmacı" },
                new() { UserName ="HuseyinOksuz" , Email=  "huseyin@gmail.com" , FullName = "Hüseyin Öksüz" }
            };
            foreach(var user in newUsers){
                await userManager.CreateAsync(user,"Abc.123");
                
            }

        }
    }
}