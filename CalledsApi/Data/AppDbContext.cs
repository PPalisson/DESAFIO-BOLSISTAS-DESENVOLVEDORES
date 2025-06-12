// Importa os namespaces necessários do Entity Framework e dos seus modelos.
using Microsoft.EntityFrameworkCore;
using CalledsApi.Models;
using System.Collections.Generic;

// Define o namespace para organizar as classes de acesso a dados.
namespace CalledsApi.Data {
    // A classe AppDbContext herda de DbContext, que é a classe base do Entity Framework Core.
    public class AppDbContext : DbContext {
        // Construtor que recebe as opções de configuração do DbContext (como a string de conexão).
        // Essas opções são injetadas automaticamente pelo sistema de injeção de dependência do ASP.NET Core.
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        // DbSet<Called> representa uma coleção de todos os chamados no banco de dados.
        // É através desta propriedade que você irá consultar e manipular a tabela "tb_calleds".
        // O nome da propriedade, "Calleds", será usado para acessar os dados (ex: _context.Calleds).
        public DbSet<Called>? Calleds { get; set; }
    }
}
