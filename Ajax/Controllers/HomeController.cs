using Ajax.DAL;
using Ajax.Models;
using System;
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
        public JsonResult LoadData(string name, string status, int page, int pageSize = 2)
        {
            IQueryable<Employee> model = _context.Employees;
            if (!string.IsNullOrEmpty(name))
                model = model.Where(x => x.Name.Contains(name));
            if (!string.IsNullOrEmpty(status))
            {
                var statusBool = bool.Parse(status);
                model = model.Where(x => x.Status == statusBool);
            }
            int totalRow = model.Count();
            model = model.OrderBy(x=>x.Id).Skip((page - 1) * pageSize).Take(pageSize);          
            return Json(new { data = model, total = totalRow, status = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetDetail(int id)
        {
            var employee = _context.Employees.Find(id);
            return Json(new { data = employee, status = true }, JsonRequestBehavior.AllowGet);
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
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var employee = _context.Employees.Find(id);
            _context.Employees.Remove(employee);
            try
            {
                _context.SaveChanges();
                return Json(new { status = true });
            }
            catch(Exception e)
            {
                return Json(new { status = false, message = e.Message });
            }     
        }
        [HttpPost]
        public JsonResult SaveData(string strEmployee)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            Employee employee = serializer.Deserialize<Employee>(strEmployee);
            bool status = false;
            string message = string.Empty;
            //add new if id = 0
            if (employee.Id == 0)
            {
                employee.CreatedDate = DateTime.Now;
                _context.Employees.Add(employee);
                try
                {
                    _context.SaveChanges();
                    status = true;
                }
                catch (Exception ex)
                {
                    status = false;
                    message = ex.Message;
                }
            }
            //update existing DB
            else
            {
                var entity = _context.Employees.Find(employee.Id);
                entity.Name = employee.Name;
                entity.Salary = employee.Salary;
                entity.Status = employee.Status;   
                try
                {
                    _context.SaveChanges();
                    status = true;
                }catch(Exception ex)
                {
                    status = false;
                    message = ex.Message;
                }
            } 
            return Json(new { status = status, message = message });
        }
    }
}