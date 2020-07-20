using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.ViewModel
{
    public class FiltroViewModel
    {
        public int? idTipo { get; set; }
        public string Endereco { get; set; }
        public float? PrecoInicialComprar { get; set; }
        public float? PrecoFinalComprar { get; set; }
        public float? PrecoInicialAlugar { get; set; }
        public float? PrecoFinalAlugar { get; set; }
        public int? numQuartos { get; set; }
        public string tipoValor { get; set; }
    }
}
