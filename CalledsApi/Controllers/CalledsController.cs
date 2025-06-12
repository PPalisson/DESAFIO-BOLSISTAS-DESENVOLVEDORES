using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalledsApi.Data;      
using CalledsApi.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CalledsApi.Controllers {
    [ApiController] // Marca esta classe como um controlador de API, habilitando recursos como a inferência de fonte de parâmetros.
    [Route("calleds")] // Define a rota base para todos os endpoints neste controlador. Ex: https://localhost:7159/calleds
    public class CalledsController : ControllerBase {
        // Campo privado para armazenar a instância do contexto do banco de dados.
        private readonly AppDbContext _context;
        // Construtor do controlador que recebe o AppDbContext via injeção de dependência.
        public CalledsController(AppDbContext context) {
            _context = context;
        }

        // GET: /calleds ou /calleds?id=1 ou /calleds?title=problema
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? id, [FromQuery] string? title) {
            // Inicia uma consulta na tabela de chamados. AsQueryable() adia a execução da consulta no banco.
            var query = _context.Calleds.AsQueryable();
            // Se um 'id' foi passado na URL, filtra a consulta por esse ID.
            if (id.HasValue)
                query = query.Where(c => c.Id == id.Value);
            // Se um 'title' foi passado, filtra por títulos que contenham o texto (ignorando maiúsculas/minúsculas).
            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(c => EF.Functions.ILike(c.Title, $"%{title}%"));
            // Executa a consulta no banco de dados e obtém a lista de resultados.
            var result = await query.ToListAsync();
            // Retorna um status 200 OK com os dados em um objeto JSON.
            return Ok(new { data = result });
        }

        // PUT: /calleds/5 (Atualiza ou Cria um chamado)
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Called called) {
            // Verifica se o ID da rota é o mesmo do ID no corpo da requisição.
            if (id != called.Id)
                return BadRequest("ID da rota não corresponde ao ID do objeto.");
            // Procura o chamado existente no banco de dados pelo ID.
            var existente = await _context.Calleds.FindAsync(id);
            // Se o chamado não existe...
            if (existente == null) {
                // ...cria um novo. Define a data de criação.
                called.CreatedAt = DateTime.UtcNow; // Usa UTC para um padrão de tempo universal.

                _context.Calleds.Add(called);// Adiciona o novo chamado ao contexto.
            }
            else { // Se o chamado já existe...
                // ...atualiza suas propriedades.
                existente.Title = called.Title;
                existente.Description = called.Description;
                
            }
            // Salva todas as alterações (seja a inserção ou a atualização) no banco de dados.
            await _context.SaveChangesAsync();
            return NoContent(); // Retorna 204 No Content, indicando sucesso sem corpo de resposta
        }


        // POST: /calleds (Cria um novo chamado)            
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Called called) {
            // Define a data de criação do novo chamado.
            called.CreatedAt = DateTime.UtcNow;
            // Adiciona o novo chamado ao contexto do Entity Framework.
            _context.Calleds.Add(called);
            // Salva as alterações no banco de dados.
            await _context.SaveChangesAsync();
            // Retorna um status 201 Created. Isso informa ao cliente que o recurso foi criado com sucesso.
            // Também retorna um cabeçalho "Location" com a URL para acessar o novo chamado e o objeto criado no corpo.
            return CreatedAtAction(nameof(Get), new { id = called.Id }, called);
        }




        // DELETE: /calleds/5 (Exclui um chamado)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            // Busca o chamado pelo ID.
            var chamado = await _context.Calleds.FindAsync(id);
            // Se o chamado não for encontrado, retorna um status 404 Not Found.
            if (chamado == null)
                return NotFound();
            // Remove o chamado do contexto.
            _context.Calleds.Remove(chamado);
            // Salva a remoção no banco de dados.
            await _context.SaveChangesAsync();
            // Retorna 204 No Content, indicando que a operação foi bem-sucedida.  
            return NoContent();
        }
    }
}
