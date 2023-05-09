namespace backendtest.Repositories;

using Dapper;
using backendtest.Models;
using MySqlConnector;

public class DogRepository : IDogRepository {
    private MySqlConnection _connection;

    public DogRepository(MySqlConnection connection) {
        _connection = connection;
    }

    public async Task Create(Dog dog) {
        var sql =
            @"INSERT INTO Dogs (name,date,address,contact,description,imagename,size) VALUES (@Name,@Date,@Address,@Contact,@Description,@ImageName,@Size)";
        await _connection.ExecuteAsync(sql, dog);
    }

    public async Task Delete(int id) {
        var sql = @"DELETE FROM Dogs WHERE Id = @id";
        await _connection.ExecuteAsync(sql, new { id });
    }

    public async Task<IEnumerable<Dog>> GetAll() {
        var sql = @"SELECT * FROM Dogs";
        return await _connection.QueryAsync<Dog>(sql);
    }

    public async Task<Dog> GetById(int id) {
        var sql = @"SELECT * FROM Dogs WHERE id = @id";

        return await _connection.QuerySingleOrDefaultAsync<Dog>(sql, new { id });
    }

    public async Task Update(Dog dog) {
        var sql =
            @"UPDATE Dogs SET name = @Name,
                                date = @Date,
                                address = @Address,
                                contact = @contact,
                                description = @Description,
                                size = @Size,
                                imagename = @ImageName WHERE Id = @id";
        await _connection.ExecuteAsync(sql, dog);
    }
}
