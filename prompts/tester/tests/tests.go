package tests

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "time"

    _ "github.com/lib/pq"
)

type TestResult struct {
    SchemaValid        bool              `json:"schema_valid"`
    DataValid          bool              `json:"data_valid"`
    ConstraintValid    bool              `json:"constraint_valid"`
    Errors             []string          `json:"errors"`
    PerformanceMetrics map[string]string `json:"performance_metrics"`
}

func RunTests(dsn, schema string, mockData json.RawMessage) (TestResult, error) {
    var result TestResult
    var errors []string

    // Connect to PostgreSQL
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        errors = append(errors, "Failed to connect to database")
        result.Errors = errors
        return result, err
    }
    defer db.Close()

    // Ping the database to ensure connection is established
    if err := db.Ping(); err != nil {
        errors = append(errors, fmt.Sprintf("Database ping failed: %v", err))
        result.Errors = errors
        return result, err
    }

    // Start measuring performance
    startTime := time.Now()

    // Schema Test
    if err := runSchemaTest(db, schema); err != nil {
        errors = append(errors, fmt.Sprintf("Schema test failed: %v", err))
        result.SchemaValid = false
    } else {
        result.SchemaValid = true
    }

    // Data Test
    if err := runDataTest(db, mockData); err != nil {
        errors = append(errors, fmt.Sprintf("Data test failed: %v", err))
        result.DataValid = false
    } else {
        result.DataValid = true
    }

    // Constraint Test
    if err := runConstraintTest(db); err != nil {
        errors = append(errors, fmt.Sprintf("Constraint test failed: %v", err))
        result.ConstraintValid = false
    } else {
        result.ConstraintValid = true
    }

    // End measuring performance
    executionTime := time.Since(startTime)
    result.PerformanceMetrics = map[string]string{
        "execution_time": executionTime.String(),
    }

    result.Errors = errors
    return result, nil
}

func runSchemaTest(db *sql.DB, schema string) error {
    _, err := db.Exec(schema)
    return err
}

func runDataTest(db *sql.DB, mockData json.RawMessage) error {
    var data []map[string]interface{}
    if err := json.Unmarshal(mockData, &data); err != nil {
        return fmt.Errorf("failed to unmarshal mock data: %v", err)
    }

    // Insert data
    for _, row := range data {
        // Adjust table name and columns based on your schema
        _, err := db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", row["name"], row["email"])
        if err != nil {
            return fmt.Errorf("failed to insert data: %v", err)
        }
    }

    // Retrieve data (optional: add verification logic)
    rows, err := db.Query("SELECT id, name, email FROM users")
    if err != nil {
        return fmt.Errorf("failed to retrieve data: %v", err)
    }
    defer rows.Close()

    // Example: Iterate through rows
    for rows.Next() {
        var id int
        var name, email string
        if err := rows.Scan(&id, &name, &email); err != nil {
            return fmt.Errorf("failed to scan row: %v", err)
        }
        // You can perform additional checks here if needed
    }

    // Update data
    _, err = db.Exec("UPDATE users SET name = $1 WHERE email = $2", "Updated Name", "alice@example.com")
    if err != nil {
        return fmt.Errorf("failed to update data: %v", err)
    }

    // Delete data
    _, err = db.Exec("DELETE FROM users WHERE email = $1", "bob@example.com")
    if err != nil {
        return fmt.Errorf("failed to delete data: %v", err)
    }

    return nil
}

func runConstraintTest(db *sql.DB) error {
    // Attempt to insert duplicate email to test unique constraint
    _, err := db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", "Duplicate User", "alice@example.com")
    if err == nil {
        return fmt.Errorf("constraint not enforced: duplicate email allowed")
    }

    return nil
}


