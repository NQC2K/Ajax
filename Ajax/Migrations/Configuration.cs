namespace Ajax.Migrations
{
    using Ajax.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Ajax.DAL.EmployeeDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Ajax.DAL.EmployeeDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            context.Employees.AddOrUpdate(
                new Employee { Name = "Andrew Peters", Salary = 3000000, CreatedDate = DateTime.Now, Status = true },
                new Employee { Name = "Brice Lambson", Salary = 2000000, CreatedDate = DateTime.Now, Status = true },
                new Employee { Name = "Rowan Miller", Salary = 4000000, CreatedDate = DateTime.Now, Status = false },
                new Employee { Name = "Nolan Miller", Salary = 4000000, CreatedDate = DateTime.Now, Status = false },
                new Employee { Name = "Chris Peters", Salary = 3000000, CreatedDate = DateTime.Now, Status = true },
                new Employee { Name = "Amber Wattson", Salary = 2000000, CreatedDate = DateTime.Now, Status = true },
                new Employee { Name = "Lucy Hampton", Salary = 4000000, CreatedDate = DateTime.Now, Status = false },
                new Employee { Name = "Lux Ellery", Salary = 4000000, CreatedDate = DateTime.Now, Status = false }
            );
            context.SaveChanges();
        }
    }
}
