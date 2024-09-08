using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fridgeApi.Data;
using fridgeApi.Dto;
using fridgeApi.Mappers;
using fridgeApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fridgeApi.Controllers
{
    [Route("api/food")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IFoodRepository _foodRepo;
        private readonly ILogger<FoodController> _logger;
        public FoodController(ApplicationDBContext context, IFoodRepository foodRepo, ILogger<FoodController> logger)
        {
            _foodRepo = foodRepo;
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var foods = await _foodRepo.GetAllAsync();   
            var foodDto = foods.Select(s => s.ToFoodDto()).ToList();

            return Ok(foodDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var food = await _foodRepo.GetByIdAsync(id);

            if (food == null)
            {
                return NotFound();
            }
            return Ok(food.ToFoodDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFoodRequestDto foodDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var foodModel = foodDto.ToFoodFromCreateDTO();

            await _foodRepo.CreateAsync(foodModel);

            return CreatedAtAction(nameof(GetById), new { id = foodModel.Id }, foodModel.ToFoodDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateFoodRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("error");
                return BadRequest(ModelState);
            }

            var foodModel = await _foodRepo.UpdateAsync(id, updateDto);

            if (foodModel == null)
            {
                return NotFound();
            }

            return Ok(foodModel.ToFoodDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var foodModel = await _foodRepo.DeleteAsync(id);

            if (foodModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        
    }
}