using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Models
{
    public class GetPersonsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string ProfilePicture { get; set; }
        public string MobileNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Gender { get; set; }
        public string CityName { get; set; }
        public string CountryName { get; set; }
        public int  CityId{ get; set; }
        public int CountryId { get; set; }
    }
}
