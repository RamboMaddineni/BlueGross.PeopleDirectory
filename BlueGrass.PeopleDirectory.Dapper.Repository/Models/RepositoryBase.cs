using BlueGrass.PeopleDirectory.Dapper.Repository.Contracts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlueGrass.PeopleDirectory.Dapper.Repository.Models
{
   public class RepositoryBase
    {
        public IDapperRepository _dapperRepository;
        public DbConnection _dbconnection { get; set; } = new DbConnection();

        public IConfiguration _configuration;
        public RepositoryBase(IDapperRepository dapperRepository, IConfiguration configuration)
        {
            _dapperRepository = dapperRepository;
            _configuration = configuration;
            _dbconnection.ConnectionString = configuration.GetSection("PeopleDetailsConnectionString").Value;
        }
    }
}
