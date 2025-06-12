using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Define o namespace para organizar as classes de modelo.
namespace CalledsApi.Models {
    // O atributo [Table] especifica que esta classe deve ser mapeada para uma tabela chamada "tb_calleds" no banco de dados.
    [Table("tb_calleds")]
    public class Called {
        // [Key] marca a propriedade 'Id' como a chave primária da tabela.
        [Key]
        // [DatabaseGenerated(DatabaseGeneratedOption.Identity)] informa ao banco de dados que ele deve gerar o valor para esta coluna automaticamente (geralmente como um campo autoincremento).
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        // [MaxLength(255)] define o tamanho máximo da coluna de texto correspondente no banco de dados.

        [MaxLength(255)]
        public string?  Title { get; set; } // O '?' indica que a propriedade 'Title' pode ser nula.

        public string? Description { get; set; } // A descrição do chamado, também pode ser nula.

        public DateTime CreatedAt { get; set; } // Armazena a data e a hora em que o chamado foi criado.
    }
}
