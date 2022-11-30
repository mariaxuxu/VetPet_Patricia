using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoFinal_API.Data;
using ProjetoFinal_API.Models;
using Microsoft.AspNetCore.Authorization;

namespace ProjetoFinal_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : Controller
    {
        private readonly VetContext _context;
        public PetsController(VetContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "veterinario")]
        public ActionResult<List<Pets>> GetAll()
        {
            return _context.Pets.ToList();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "veterinario")]
        public ActionResult<List<Pets>> Get(int id)
        {
            try
            {
                var result = _context.Pets.Find(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpPost]
        [Authorize(Roles = "veterinario")]
        public async Task<ActionResult> post(Pets model)
        {
            try
            {
                _context.Pets.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Pets/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "veterinario")]
        public async Task<IActionResult> put(int id, Pets dadosPetsAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Pets.FindAsync(id);
                if (id != result.id)
                {
                    return BadRequest();
                }
                result.nome = dadosPetsAlt.nome;
                result.animal = dadosPetsAlt.animal;
                result.situacao = dadosPetsAlt.situacao;
                result.codSala = dadosPetsAlt.codSala;
                await _context.SaveChangesAsync();
                return Created($"/api/Pets/{dadosPetsAlt.id}", dadosPetsAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "veterinario")]
        public async Task<ActionResult> delete(int id)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var pets = await _context.Pets.FindAsync(id);
                if (pets == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(pets);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}

