namespace BlueGrass.PeopleDirectory.Dapper.Repository.Models
{
    public class DbRequest<T> where T:new()
    {
        public DbConnection DbConnection { get; set; } = new DbConnection();
        public T item { get; set; }
    }
}
