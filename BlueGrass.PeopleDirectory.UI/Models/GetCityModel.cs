using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Models
{
    public class GetCityModel
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
    }
}
