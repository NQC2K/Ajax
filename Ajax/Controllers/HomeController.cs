using Ajax.DAL;
using Ajax.Models;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Ajax.Controllers
{
    public class HomeController : Controller
    {
        private EmployeeDbContext _context;
        public HomeController()
        {
            _context = new EmployeeDbContext();
        }
        //private List<Employee> listEmployee = new List<Employee>() {
        //    new Employee()
        //    {
        //        Id = 1,
        //        Name = "Nguyen Van A",
        //        Salary = 2000000,
        //        Status = true            
        //    },
        //    new Employee()
        //    {
        //        Id = 2,
        //        Name = "Nguyen Van B",
        //        Salary = 2000000,
        //        Status = true
        //    },
        //    new Employee()
        //    {
        //        Id = 3,
        //        Name = "Nguyen Van C",
        //        Salary = 2000000,
        //        Status = false
        //    },
        //    new Employee()
        //    {
        //        Id = 4,
        //        Name = "Tran Thi D",
        //        Salary = 3000000,
        //        Status = false
        //    },
        //    new Employee()
        //    {
        //        Id = 5,
        //        Name = "Nguyen Phuoc E",
        //        Salary = 2000000,
        //        Status = false
        //    }
        //};

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult LoadData(int page, int pageSize = 2)
        {
            var model = _context.Employees.OrderBy(x=>x.Id).Skip((page - 1) * pageSize).Take(pageSize);
            int totalRow = _context.Employees.Count();
            return Json(new { data = model, total = totalRow, status = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(string model)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            Employee employee = serializer.Deserialize<Employee>(model);
            var entity = _context.Employees.Find(employee.Id);
            entity.Salary = employee.Salary;
            return Json(new { status = true });
        }
    }
}