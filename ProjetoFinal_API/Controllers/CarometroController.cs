using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoFinal_API.Data;
using ProjetoFinal_API.Models;

using Microsoft.AspNetCore.Authorization;

namespace ProjetoEscola_API.Controllers
{
    //[Route("api/[controller]/[action]")]
    [Route("api/[controller]")]
    [ApiController]
    public class CarometroController : ControllerBase
    {
        private VetContext _context;

        public CarometroController(VetContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "veterinario, dona")]
        public ActionResult<List<Pets>> GetPets()
        {
            return _context.Pets.ToList();
        }
    }
}