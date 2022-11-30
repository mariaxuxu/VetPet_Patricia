namespace ProjetoFinal_API.Models
{
    public class Pets
    {
        public int id { get; set; }
        public string? nome { get; set; }
        public string? animal { get; set; }
        public string? situacao { get; set; }
        public int codSala { get; set; }
        public int idDono { get; set; }
    }
}