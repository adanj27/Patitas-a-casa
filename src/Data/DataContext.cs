namespace backendtest.Data;

using Dapper;
using MySqlConnector;

/// <summary>
/// Represents a data context for interacting with the dogs database.
/// </summary>
public class DataContext {
    private MySqlConnection _connection;
    public DataContext(MySqlConnection connection) {
        _connection = connection;
    }
    // <summary>
    /// Initializes the dogs database and creates the Dogs table if it doesn't exist.
    /// </summary>
    public async Task Init() {
        var sql =
            @"CREATE DATABASE IF NOT EXISTS `dogs`;
             CREATE TABLE IF NOT EXISTS Dogs(id INT NOT NULL AUTO_INCREMENT,
             name VARCHAR(255) NOT NULL,
             date DATETIME NOT NULL,
             address VARCHAR(255) NOT NULL,
             size VARCHAR(255) NOT NULL,
             contact VARCHAR(255) NOT NULL,
             description VARCHAR(255) NOT NULL,
             imagename VARCHAR(255) NOT NULL,
             PRIMARY KEY(Id));";
        await _connection.ExecuteAsync(sql);
    }
}
