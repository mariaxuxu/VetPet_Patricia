using Microsoft.EntityFrameworkCore;
using ProjetoFinal_API.Models;
using System.Diagnostics.CodeAnalysis;

namespace ProjetoFinal_API.Data
{
    public class VetContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public VetContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }
        public DbSet<Pets>? Pets { get; set; }
        public DbSet<User>? usuarioVet { get; set; }
    }
}