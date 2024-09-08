using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fridgeApi.Dto;
using fridgeApi.Models;

namespace fridgeApi.Interfaces
{
    public interface IFoodRepository
    {
        Task<List<Food>> GetAllAsync();
        Task<Food?> GetByIdAsync(int id);
        Task<Food> CreateAsync(Food foodModel);
        Task<Food?> UpdateAsync(int id, UpdateFoodRequestDto foodDto);
        Task<Food?> DeleteAsync(int id);
    }
}