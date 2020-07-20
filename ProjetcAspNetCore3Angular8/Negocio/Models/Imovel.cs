using Dapper.Contrib.Extensions;
using ProjetcAspNetCore3Angular8.Negocio.Interfaces;
using ProjetcAspNetCore3Angular8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Models
{
    [Table("imovel")]
    public class Imovel : IImovel
    {
        [Key]
        public int idImovel { get; set; }
        public int numero { get; set; }
        public int numComodos { get; set; }
        public int numQuartos { get; set; }
        public int numBanheiros { get; set; }
        public string descricao { get; set; }

        public int idTipo { get; set; }
        public int idEndereco { get; set; }


        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }

        public float? valorAluguel { get; set; }
        public float? valorVenda { get; set; }
        public string complemento { get; set; }

        public static implicit operator Imovel(ImovelViewModel e)
        {
            return new Imovel
            {
                idImovel = e.idImovel,
                ativo = e.ativo,
                complemento = e.complemento,
                dataInsert = e.dataInsert,
                dataUpdate =  e.dataUpdate,
                descricao = e.descricao,
                idEndereco = e.idEndereco,
                idTipo = e.idTipo,
                numBanheiros = e.numBanheiros,
                numComodos = e.numComodos,
                numero = e.numero,
                numQuartos = e.numQuartos,
                valorAluguel = e.valorAluguel,
                valorVenda = e.valorVenda
            };
        }
    }
}
