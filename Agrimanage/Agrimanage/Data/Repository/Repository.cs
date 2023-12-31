﻿using Agrimanage.Infrastructure;
using Agrimanage.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace Agrimanage.Data.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        DbSet<T> _dbSet;
        AgrimanageDbContext _dbContext;

        public Repository(AgrimanageDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task<T> Get(Expression<Func<T, bool>> expression, List<string>? includes = null)
        {
            IQueryable<T> query = _dbSet;

            if (includes != null)
            {
                foreach (var includeProperty in includes)
                {
                    query = query.Include(includeProperty);
                }
            }

            return (await query.FirstOrDefaultAsync(expression))!;
        }

        public async Task<IList<T>> GetAll(Expression<Func<T, bool>>? expression = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, List<string>? includes = null)
        {
            IQueryable<T> query = _dbSet;

            if (expression != null)
            {
                query = query.Where(expression);
            }

            if (includes != null)
            {
                foreach (var includeProperty in includes)
                {
                    query = query.Include(includeProperty);
                }
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            return (await query.AsNoTracking().ToListAsync())!;
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
