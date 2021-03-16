using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace back_end.Models
{
    public partial class duujeodoq7bvqContext : DbContext
    {
        public duujeodoq7bvqContext()
        {
        }

        public duujeodoq7bvqContext(DbContextOptions<duujeodoq7bvqContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "en_US.UTF-8");

            modelBuilder.Entity<Document>(entity =>
            {
                entity.ToTable("documents");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.NameFile)
                    .HasColumnType("character varying")
                    .HasColumnName("name_file");

                entity.Property(e => e.Path)
                    .HasColumnType("character varying")
                    .HasColumnName("path");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ConfirmedOn).HasColumnName("confirmed_on");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("created_on");

                entity.Property(e => e.DateBirthday)
                    .HasColumnType("date")
                    .HasColumnName("date_birthday");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.EmailConfirmed)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasColumnName("email_confirmed");

                entity.Property(e => e.Fullname)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("fullname");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("character varying")
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("role");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
