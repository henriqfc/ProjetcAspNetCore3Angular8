using Dapper.Contrib.Extensions;
using ProjetcAspNetCore3Angular8.Negocio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Models
{
    [Table("tipo")]
    public class Tipo : ITipo
    {
        [Key]
        public int idTipo { get; set; }
        public string nomeTipo { get; set; }
        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }
    }
}
