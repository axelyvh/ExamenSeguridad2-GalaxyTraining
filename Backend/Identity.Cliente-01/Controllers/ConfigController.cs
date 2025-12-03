using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Cliente_01.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ConfigController : ControllerBase
    {
        [HttpGet("Seguro")]
        public IActionResult Accesos()
        {
            return Ok("Es un endpoint seguro");
        }
    }
}
