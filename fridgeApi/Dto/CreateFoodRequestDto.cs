using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace fridgeApi.Dto
{
    public class CreateFoodRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime ExpiryDate { get; set; }
        
    }
}