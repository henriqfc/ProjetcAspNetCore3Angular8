using ProjetcAspNetCore3Angular8.Negocio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.ViewModel
{
    public class ImagensImovelViewModel : IImagensImovel
    {
        
        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }
        public int idImagensImovel { get; set; }
        public int idImovelImagem { get; set; }
        public string path { get; set; }
        public string name { get; set; }
    }
}
