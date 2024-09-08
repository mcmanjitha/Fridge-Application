using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fridgeApi.Dto;
using fridgeApi.Models;

namespace fridgeApi.Mappers
{
    public static class FoodMappers
    {
        public static Food ToFoodFromCreateDTO(this CreateFoodRequestDto foodDto)
        {
            return new Food
            {
                Name = foodDto.Name,
                ExpiryDate = foodDto.ExpiryDate,
            };
        }

        public static FoodDto ToFoodDto(this Food foodDto)
        {
            return new FoodDto
            {
                Id = foodDto.Id,
                Name = foodDto.Name,
                ExpiryDate = foodDto.ExpiryDate.ToString("yyyy-MM-dd"),
            };
        }
    }
}