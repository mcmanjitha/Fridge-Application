using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fridgeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace fridgeApi.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<Food> Foods { get; set; }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     base.OnModelCreating(builder);

        //     builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

        //     builder.Entity<Portfolio>()
        //         .HasOne(u => u.AppUser)
        //         .WithMany(u => u.Portfolios)
        //         .HasForeignKey(p => p.AppUserId);

        //     builder.Entity<Portfolio>()
        //         .HasOne(u => u.Stock)
        //         .WithMany(u => u.Portfolios)
        //         .HasForeignKey(p => p.StockId);


        //     List<IdentityRole> roles = new List<IdentityRole>
        //     {
        //         new IdentityRole
        //         {
        //             Name = "Admin",
        //             NormalizedName = "ADMIN"
        //         },
        //         new IdentityRole
        //         {
        //             Name = "User",
        //             NormalizedName = "USER"
        //         },
        //     };
        //     builder.Entity<IdentityRole>().HasData(roles);
        // }
    }
}