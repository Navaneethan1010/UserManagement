using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserManagementWebAPI.DAL;

namespace UserManagementWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManagementDBContext _context;

        public UsersController(UserManagementDBContext context)
        {
            _context = context;
        }

        //// GET: api/Users
        //[Route("Userdetails")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetUser()
        //{
        //    return await _context.User.ToListAsync();
        //}
        [Route("Userdetails")]
        [HttpGet]
        public object GetUser()
        {
            var userList = _context.User.ToList();
            return userList;
        }
        //// GET: api/Users/5
        //[Route("UserdetailById")]
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(int id)
        //{
        //    var user = await _context.User.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}
        [Route("UserdetailById")]
        [HttpGet]
        public object StudentdetailById(int id)
        {
            var obj = _context.User.Where(x => x.UserId == id).ToList().FirstOrDefault();
            return obj;
        }
        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("UpateUser")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        [Route("AddorUpdateUser")]
        [HttpPost]
        public object AddorUpdatestudent(User usr)
        {
            try
            {
                if (usr.UserId == 0)
                {
                    User objUser = new User();
                    objUser.PCode = usr.PCode;
                    objUser.FirstName = usr.FirstName;
                    objUser.LastName = usr.LastName;
                    objUser.Email = usr.Email;
                    objUser.IsActive = usr.IsActive;
                    _context.User.Add(objUser);
                    _context.SaveChanges();
                    return new Response
                    {
                        Status = "Success",
                        Message = "user created Successfully"
                    };
                }
                else
                {
                    var obj = _context.User.Where(x => x.UserId == usr.UserId).ToList().FirstOrDefault();
                    if (obj.UserId > 0)
                    {
                        obj.PCode = usr.PCode;
                        obj.FirstName = usr.FirstName;
                        obj.LastName = usr.LastName;
                        obj.Email = usr.Email;
                        obj.IsActive = usr.IsActive;
                        _context.SaveChanges();
                        return new Response
                        {
                            Status = "Updated",
                            Message = "Updated Successfully"
                        };
                    }
                    return CreatedAtAction("GetUser", new { id = usr.UserId }, usr);
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return new Response
            {
                Status = "Error",
                Message = "Data not insert"
            };

        }
        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("CreateUser")]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [Route("DeleteUser")]
        [HttpDelete("{id}")]
       
        public object DeleteUser(int id)
        {
            var obj = _context.User.Where(x => x.UserId == id).ToList().FirstOrDefault();
            _context.User.Remove(obj);
            _context.SaveChanges();
            return new Response
            {
                Status = "Delete",
                Message = "Delete Successfuly"
            };
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserId == id);
        }
    }
}
