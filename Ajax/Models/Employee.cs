using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Ajax.Models
{
    [Table("Employees")]
    public class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(255)]
        [Column(TypeName="nvarchar")]
        [Required]
        public string Name { get; set; }

        public float Salary { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public bool Status { get; set; }
    }
}