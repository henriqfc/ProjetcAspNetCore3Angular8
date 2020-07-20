using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Interfaces
{
    public interface IImagensImovel
    {
        public int idImagensImovel { get; set; }
        public int idImovelImagem { get; set; }
        string path { get; set; }
        public string name { get; set; }
        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }
    }
}
