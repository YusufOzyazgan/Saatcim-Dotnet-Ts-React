using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RegisterDTO
{
    [Required(ErrorMessage ="Kullanıcı Adı Zorunlu!")]
    public string UserName {get; set;}  =null!;

    [Required(ErrorMessage ="Ad Soyad Zorunlu!")]
    public string FullName {get; set;}=null!;

    [Required(ErrorMessage ="Email Zorunlu!")]
    [EmailAddress]
    public string Email {get; set;}=null!;
    
    [Required(ErrorMessage ="Şifre Belirlemediniz!",AllowEmptyStrings = false)]
    
    public string Password {get; set;}=null!;

    [Compare(nameof(Password), ErrorMessage ="Şifreleriniz uyuşmuyor")]
    public string ConfirmPassword  {get; set;} =null!;
    
}