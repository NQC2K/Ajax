using Ajax.Models;
using System.Data.Entity;

namespace Ajax.DAL
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext() : base("EmployeeConnectionString")
        {

        }
        public DbSet<Employee> Employees{ set; get;}
    }
}