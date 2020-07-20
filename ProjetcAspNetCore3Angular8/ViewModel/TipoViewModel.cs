using ProjetcAspNetCore3Angular8.Negocio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.ViewModel
{
    public class TipoViewModel : ITipo
    {
        public int idTipo { get; set; }
        public string nomeTipo { get; set; }
        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }

    }
}
