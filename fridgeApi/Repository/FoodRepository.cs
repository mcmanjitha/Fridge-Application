using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fridgeApi.Data;
using fridgeApi.Dto;
using fridgeApi.Interfaces;
using fridgeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace fridgeApi.Repository
{
    public class FoodRepository : IFoodRepository
    {
        private readonly ApplicationDBContext _context;
        public FoodRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Food> CreateAsync(Food foodModel)
        {
            await _context.Foods.AddAsync(foodModel);
            await _context.SaveChangesAsync();
            return foodModel;
        }

        public async Task<Food?> DeleteAsync(int id)
        {
            var foodModel = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if (foodModel == null)
            {
                return null;
            }

            _context.Foods.Remove(foodModel);
            await _context.SaveChangesAsync();
            return foodModel;
        }

        public Task<List<Food>> GetAllAsync()
        {
            var foods = _context.Foods.ToListAsync();

            return foods;
        }

        public async Task<Food?> GetByIdAsync(int id)
        {
            return await _context.Foods.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Food?> UpdateAsync(int id, UpdateFoodRequestDto foodDto)
        {
            var existingFood = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if (existingFood == null)
            {
                return null;
            }

            existingFood.Name = foodDto.Name;
            existingFood.ExpiryDate = foodDto.ExpiryDate;

            await _context.SaveChangesAsync();

            return existingFood;
        }
    }
}