using Dapper.Contrib.Extensions;
using ProjetcAspNetCore3Angular8.Negocio.Interfaces;
using ProjetcAspNetCore3Angular8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetcAspNetCore3Angular8.Negocio.Models
{
    [Table("endereco")]
    public class Endereco : IEndereco
    {
        [Key]
        public int idEndereco { get; set; }
        public string cep { get; set; }
        public string rua { get; set; }
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string uf { get; set; }
        public DateTime dataInsert { get; set; }
        public DateTime dataUpdate { get; set; }
        public bool ativo { get; set; }

        public static implicit operator Endereco(EnderecoViewModel e)
        {
            return new Endereco
            {
                idEndereco = e.idEndereco,
                ativo = e.ativo,
                bairro = e.bairro,
                cep = e.cep,
                cidade = e.cidade,
                dataInsert = e.dataInsert,
                dataUpdate = e.dataUpdate,
                rua = e.rua,
                uf = e.uf
            };
        }
    }
}
