using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fridgeApi.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }

        
    }
}