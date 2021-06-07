using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagementWebAPI;

namespace UserManagementWebAPI.DAL
{
    public class UserManagementDBContext :DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source = UserManagementDB.db;");
        }
        public DbSet<User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
            new User() {UserId=5, PCode="NY221",  FirstName = "Christober", LastName = "John", Email = "Amelia@test.com", IsActive =true},
            new User() { UserId = 6, PCode="NY222", FirstName = "Adam", LastName = "GilGrist", Email = "Adam@test.com", IsActive = false },
            new User() { UserId = 1, PCode = "TX001", FirstName = "Williams", LastName = "Jone", Email = "Williams@test.com", IsActive = true },
            new User() { UserId = 2, PCode = "TX002", FirstName = "Steve", LastName = "Curtis", Email = "Steve@test.com", IsActive = false }
            );
        }
    }
}
