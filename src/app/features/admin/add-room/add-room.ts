import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../core/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  imports: [ReactiveFormsModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css',
})
export class AddRoom implements OnInit{
  roomForm!: FormGroup;

  roomTypes: string[] = [];

  preview: string | ArrayBuffer | null = null;

  selectedFile!: File;

  error = '';

  success = '';

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.roomForm = this.fb.group({

      type: ['', Validators.required],

      roomNumber: ['', Validators.required],

      pricePerNight: ['', Validators.required],

      capacity: ['', Validators.required],

      description: ['']
    });

    this.fetchRoomTypes();
  }

  fetchRoomTypes(): void {

    this.roomService
      .getRoomTypes()
      .subscribe({

        next: (types: any) => {

          this.roomTypes = types;
        }
      });
  }

  onFileChange(event: any): void {

    const file =
      event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.preview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  addRoom(): void {

    if (this.roomForm.invalid) {

      this.error =
        'All room details required';

      return;
    }

    const confirmed =
      confirm(
        'Do you want to add this room?'
      );

    if (!confirmed) return;

    const formData =
      new FormData();

    Object.entries(
      this.roomForm.value
    ).forEach(([key, value]) => {

      formData.append(
        key,
        String(value)
      );
    });

    if (this.selectedFile) {

      formData.append(
        'imageFile',
        this.selectedFile
      );
    }

    this.roomService
      .addRoom(formData)
      .subscribe({

        next: (resp: any) => {

          if (resp.status === 200) {

            this.success =
              'Room Added Successfully';

            setTimeout(() => {

              this.router.navigate([
                '/admin/manage-rooms'
              ]);

            }, 5000);
          }
        },

        error: (err) => {

          this.error =
            err.error?.message || 'Error';
        }
      });
  }
}
