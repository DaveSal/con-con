class Individual < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessor :seller

  has_many :publications, foreign_key: 'author_id'
  has_many :bought_publications, foreign_key: 'sold_to', class_name: 'Publication'

  has_attached_file :image,
                    styles: { medium: '300x300>', thumb: '100x100>'},
                    default_url: '/images/:style/missing.png'
  validates_attachment_content_type :image, 
                    content_type: ['image/jpeg', 'image/gif', 'image/png']

  def can_sell?
    stripe_user_id.present?
  end
end
