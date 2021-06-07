﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UserManagementWebAPI.DAL;

namespace UserManagementWebAPI.Migrations
{
    [DbContext(typeof(UserManagementDBContext))]
    partial class UserManagementDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("UserManagementWebAPI.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("PCode")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            UserId = 5,
                            Email = "Amelia@test.com",
                            FirstName = "Christober",
                            IsActive = true,
                            LastName = "John",
                            PCode = "NY221"
                        },
                        new
                        {
                            UserId = 6,
                            Email = "Adam@test.com",
                            FirstName = "Adam",
                            IsActive = false,
                            LastName = "GilGrist",
                            PCode = "NY222"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
