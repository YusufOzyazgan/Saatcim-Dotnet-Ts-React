using System.Text;
using API.Data;
using API.Entity;
using API.Middlewares;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
{
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("defaultConnection");

    options.UseSqlite(connectionString);
});

builder.Services.AddCors();
builder.Services.AddIdentity<AppUser,AppRole>().AddEntityFrameworkStores<DataContext>();

builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.RequireHttpsMetadata = false;
    x.TokenValidationParameters = new(){
        ValidateIssuer = false,
        ValidIssuer = "learnInChat.com",
        ValidateAudience = false,
        ValidAudience = "firma_ismi",
       
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Security:SecretKey"]!)),
        ValidateLifetime = true,

    };
});

builder.Services.AddControllers();


builder.Services.AddScoped<TokenServices>();

builder.Services.Configure<IdentityOptions>(options => {
    options.Password.RequiredLength= 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = false;
    
    options.User.RequireUniqueEmail = true;
    
    

});


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseMiddleware<ExceptionHandling>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
    });
    // alt tarafta scalar'i ekliyoruz
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
SeedDatabase.Initilaze(app);
app.Run();
