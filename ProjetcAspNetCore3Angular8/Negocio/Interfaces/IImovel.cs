using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Interfaces
{
    public interface IImovel
    {
        public int idImovel { get; set; }
        public int numero { get; set; }
        public int numComodos { get; set; }
        public int numQuartos { get; set; }
        public int numBanheiros { get; set; }
        public string descricao { get; set; }

        public float? valorAluguel { get; set; }
        public float? valorVenda { get; set; }

        public int idTipo { get; set; }
        public int idEndereco { get; set; }

        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }

        public string complemento { get; set; }
        //public ITipo Tipo { get; set; }
        //public IEndereco Endereco { get; set; }
    }
}
